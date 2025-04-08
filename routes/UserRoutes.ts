var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var bodyParser = require("body-parser");

var userModel = require("../models/user");
var patientModel = require("../models/patient");
var physicianModel = require("../models/physician");
var VerifyToken = require("../auth/VerifyToken");

//import {FormAnswers} from "../models/patient";


var router = express.Router();
var jwt = jwt

// rota para testar - GET http://localhost:8080/med)
router.get('/', function(req, res) {
  res.json({ message: 'Bem vindo ao Med-Checker!!' });
});

// Rota para registar um utilizador - POST http://localhost:8080/med/Register/User
router.post('/Register/User', async function(req, res) {
  try {
    const {name, email, password, isAdmin} = req.body; // Extrair as variáveis do corpo da requisição

    // Criar uma nova instância do utilizador recorrendo ao modelo
    var newUser = new userModel({
      name,
      email,
      password,
      isAdmin
  });

    // Gravar o utilizador na base de dados
    await newUser.save();

    res.status(201).json({ message: 'Utilizador registado com sucesso!', utilizador: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Erro do servidor' });
  }
});


// Rota para registar um médico - POST http://localhost:8080/med/Register/Physician
router.post('/Register/Physician', async function(req, res) {
    try {
      const {specialty, user} = req.body; 
  
      // Criar uma nova instância do médico recorrendo ao modelo
      var newPhisycian = new physicianModel({
        specialty,
        user
    });
  
      // Gravar o novo médico na base de dados
      await newPhisycian.save();
  
      res.status(201).json({ message: 'Médico registado com sucesso!', physician: newPhisycian });
    } catch (err) {
      res.status(500).json({ error: 'Erro do servidor' });
    }
  });

// Rota para registar um paciente - POST http://localhost:8080/med/Register/Patient
router.post('/Register/Patient', async function(req, res) {
    
  try {
    const {physician, user} = req.body; 

    // Criar uma nova instância do paciente recorrendo ao modelo
    var newPatient = new patientModel({
      physician,
      user
  });

    // Gravar o novo paciente na base de dados
   await newPatient.save();

    res.status(201).json({ message: 'Paciente registado com sucesso!', patient: newPatient });
  } catch (err) {
    res.status(500).json({ error: 'Erro do servidor' });
  }
});


// Rota para realizar o login (todos os utilizadores) - POST http://localhost:8080/med/login
router.post('/login', async function(req: any, res: any) {
  try {
      const user = await userModel.findOne({ email: req.body.email, password: req.body.password}).exec();

      if (!user) {
          return res.status(401).json({ success: false, message: 'utilizador não encontrado!' });
      }

      const payload = { user: user.email };
      const theToken = jwt.sign(payload, 'InfMed_20232024', { expiresIn: 86400 });
      res.json({ success: true, message: 'Token gerado!', token: theToken });
  } catch (err) {
      console.error('Erro ao realizar login:', err);
      res.status(500).json({ success: false, message: 'Erro do servidor.' });
  }
});
  
// Rota para o médico visualizar a informação dos seus pacientes - GET http://localhost:8080/med/ListPatients/:physician_id
router.get('/ListPatients/:physician_id', VerifyToken, async function(req:any, res:any){
  
        const physicianId = req.params.physician_id;

        try {

            const physician = await physicianModel.findById(physicianId);
            if (!physician) {
              return res.status(404).json({ message: 'Médico não encontrado ou id não corresponde a um médico' });
            }

            // Encontrar os pacientes daquele médico.
            const patients =  await patientModel.find({ physician: physicianId }).exec();
    
            res.json(patients);
        } catch (error) {
            console.error('Erro ao buscar pacientes do médico:', error);
            res.status(500).json({ message: 'Erro do servidor.' });
        }
      
    });


// Rota para responder ao questionário - PUT http://localhost:8080/med/patients/questionnaire/:patient_id
router.put('/patients/questionnaire/:patient_id', VerifyToken, async function(req:any, res:any) {
  try {
   
      // Suponha que você tem o ID do paciente e as respostas do questionário disponíveis
      const patient = await patientModel.findById(req.params.patient_id).exec();

      if (!patient) {
        return res.status(401).json({ success: false, message: 'Paciente não encontrado ou utilizador não é o paciente em questão!' });
    }

    patient.formAnswers = req.body.formAnswers; // atualizar o paciente com as respostas do questionário
    
    // Gravar as alterações na base de dados
    await patient.save();

     //var messages = await generateAlerts(patient.formAnswers);
     var patientId = patient._id;

      // Chamar a rota POST /send/alerts para enviar os alertas gerados
      const response = await fetch('http://localhost:8080/med/send/alerts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({patientId, /*messages*/ })
      });

      // Verificar se a requisição  à rota anterior foi bem-sucedida
      if (!response.ok) {
          throw new Error('Erro ao enviar alertas.');
      } 

      // Se a requisição foi bem-sucedida, enviar uma resposta ao paciente
      res.json({ message: 'Respostas do questionário processadas.' });
  } catch (error) {
      console.error('Erro ao processar as respostas do questionário:', error);
      res.status(500).json({ message: 'Erro do servidor.' });
  }
});



// Rota para enviar os alertas para o médico e para os pacientes - POST http://localhost:8080/med/send/alerts
router.post('/send/alerts', async function(req:any, res:any) {
  try {
      const { patientId, messages } = req.body;

      // Encontrar o paciente pelo ID
      const patient = await patientModel.findById(patientId).exec();

      if (!patient) {
          return res.status(404).json({ message: 'Paciente não encontrado.' });
      }

      // Encontrar o médico do paciente em questão
      const physician = await physicianModel.findById(patient.physician).exec();

      console.log(physician);

      if (!physician) {
          return res.status(404).json({ message: 'Médico não encontrado.' });
      }


       // Atualizar alertas do paciente
      if (patient.alerts.length === 0) {
        const novoAlertaPaciente = { alertNumber: 1, message: messages };
        patient.alerts.push(novoAlertaPaciente);
    } else {
        const novoAlertaPaciente = { alertNumber: patient.alerts.length + 1, message: messages };
        patient.alerts.push(novoAlertaPaciente);
    }

    await patient.save();

    // Atualizar alertas do médico para o paciente em questão
    if (physician.alerts.length === 0) {
      const novoAlertaMedico = { alertNumber: 1, patientId: patient._id, message: messages };
      physician.alerts.push(novoAlertaMedico);
  } else {
      const novoAlertaMedico = { alertNumber: physician.alerts.length + 1, patientId: patient._id, message: messages };
      physician.alerts.push(novoAlertaMedico);
  }

       console.log(physician.alerts);
      
       await physician.save();

       console.log(physician.alerts);


      res.json({ message: 'Alertas enviados com sucesso.' });
  } catch (error) {
      console.error('Erro ao enviar alertas:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


// Rota para remover utilizadores da base de dados (apenas o adminsitrador pode aceder a esta rota) - DELETE http://localhost:8080/med/DeleteUser/:user_id
router.delete('/DeleteUser/:user_id', VerifyToken, async function(req:any, res:any)  {
  if (await hasRole(req.user, 'administrator', res)) { 
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.user_id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilizador não encontrado' });
      }

      res.json({ message: 'Utilizador removido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover utilizador:', error);
      res.status(500).json({ message: 'Erro do servidor.' });
    }
  } else {
    return res.status(403).send({ auth: false, token: null, message: 'Não tem autorização!' });
  }
});


// Rota para listar todos os utilizadores - GET http://localhost:8080/med/ListUsers
router.get('/ListUsers',  VerifyToken, async function(req:any, res:any){
  if(await hasRole(req.user, 'administrator', res)) {
    
      try {
          
          const users =  await userModel.find().exec();

          console.log(users);

          if (users.length === 0) {
            return res.status(404).json({ message: 'Nenhum utilizador encontrado.' });
        }
  
          res.json(users);
      } catch (error) {
          res.status(500).json({ message: 'Erro do servidor!' });
      }
  } else {res.status(405).json({ message: 'Não tem permissão!' });
}
});

/*
async function generateAlerts(patient: FormAnswers): Promise<String[]> {
  const alerts: String[] = [];

  const { personalInfo, medicalHistory, lifestyle, familyHistory } = patient;

  var recom:boolean = false;

  if (
      personalInfo.age !== undefined &&
      medicalHistory.comorbidities !== undefined &&
      lifestyle.exercisesRegularly !== undefined &&
      lifestyle.smokes !== undefined &&
      familyHistory.cancer !== undefined &&
      familyHistory.heartDisease !== undefined
  ) {
      if (personalInfo.age > 65 && medicalHistory.comorbidities.includes('diabetes')) {
          alerts.push('Recorrer ao programa de controle glicêmico em idosos.');
          recom = true;
      } 
      
      if (
          personalInfo.age > 50 &&
          personalInfo.gender === 'Masculino' &&
          familyHistory.heartDisease &&
          !lifestyle.exercisesRegularly
      ) {
          if (
              medicalHistory.comorbidities.includes('diabetes') &&
              medicalHistory.comorbidities.includes('hipertensão')
          ) {
              alerts.push('O paciente tem risco cardiovascular muito elevado. Marcar uma avaliação cardíaca preventiva com prioridade!');
              recom = true;
          } else if (
              medicalHistory.comorbidities.includes('diabetes') &&
              !medicalHistory.comorbidities.includes('hipertensão')
          ) {
              alerts.push('O paciente tem risco cardiovascular alto. Recomenda-se marcar uma avaliação cardíaca preventiva!');
              recom = true;
          } else if (
              !medicalHistory.comorbidities.includes('diabetes') &&
              !medicalHistory.comorbidities.includes('hipertensão')
          ) {
              alerts.push('O paciente tem risco cardiovascular moderado. Marcar consulta para verificar a necessidade de uma avaliação cardíaca preventiva!');
              recom = true;
          }
      } 
      
      if (personalInfo.age > 40 && familyHistory.cancer && lifestyle.smokes) {
          alerts.push('O paciente deve realizar exames de rastreio para o cancro frequentemente.');
          recom = true;
      } 
      
      if (personalInfo.age > 40 && !lifestyle.exercisesRegularly) {
          if (medicalHistory.comorbidities.length === 0 && !familyHistory.heartDisease) {
              alerts.push('Recomenda-se iniciar um programa de exercícios físicos moderados.');
              recom = true;
          } else {
              alerts.push('Recomenda-se iniciar um programa de exercícios físicos prescritos após avaliação médica.');
              recom = true;
          }
      } 
      
      if (
          personalInfo.age > 50 &&
          personalInfo.age <= 65 &&
          medicalHistory.comorbidities.length > 0
      ) {
          alerts.push('O paciente deve ser incluído na fila prioritária de vacinas contra gripe.');
          recom = true;
      } 
      
      if (medicalHistory.comorbidities.includes('diabetes') && familyHistory.heartDisease) {
          alerts.push('Recomenda-se um controle mais rígido dos níveis de glicose e avaliações cardíacas regulares.');
          recom = true;
      } 
      
      if (personalInfo.age > 50 && familyHistory.cancer) {
          alerts.push('Recomenda-se uma dieta rica em fibras e antioxidantes.');
          recom = true;
      } 
      
      if (personalInfo.age > 50 && lifestyle.smokes && medicalHistory.comorbidities.includes('DPOC')) {
          alerts.push('O paciente deve ser submetido a uma avaliação pulmonar detalhada.');
          recom = true;
      } 
      
      if(recom === false){
          console.log('Nenhum alerta ou recomendação para este paciente.');
      }
  } else {
      console.error('Não há respostas no formulário ou há campos em falta.');
  }

  return alerts;
}
*/

async function hasRole(userEmail: any, role: string, res: any):Promise<boolean> {
 
      const user = await userModel.findOne({ email: userEmail }).exec();
      console.log(user.isAdmin);


      if (!user) {
          res.json({ success: false, message: 'Falha na autenticação.' });
          return false;
      } else {
          if((role === 'administrator' && user.isAdmin === true) || (role === 'physician' && user.isAdmin === false))
          return true;
      }

      return false;
  
}


module.exports = router;
