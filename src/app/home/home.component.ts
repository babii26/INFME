import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    {
      title: 'Exames de PSA',
      description: 'Exame de sangue para detecção precoce do câncer de próstata.'
    },
    {
      title: 'Ultrassonografia Prostática',
      description: 'Exame de imagem para avaliação da próstata e detecção de anomalias.'
    },
    {
      title: 'Consultas de Prevenção',
      description: 'Consultas com especialistas para orientação e prevenção do câncer de próstata.'
    }
  ];

  team = [
    {
      name: 'Dr. João Oliveira',
      role: 'Urologista Especialista',
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg'
    },
    {
      name: 'Dra. Ana Santos',
      role: 'Oncologista',
      image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg'
    },
    {
      name: 'Dr. Carlos Ferreira',
      role: 'Especialista em Diagnóstico',
      image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
    },
    {
      name: 'Dra. Patrícia Almeida',
      role: 'Bioquímica Clínica',
      image: 'https://img.freepik.com/free-photo/female-scientist-working-laboratory_23-2148824040.jpg'
    }
  ];

  locations = [
    {
      name: 'Clínica Vida Plena Lisboa',
      address: 'Av. da Saúde, 110, 1000-100 Lisboa',
      phone: '210 123 456',
      mapUrl: 'https://maps.google.com/?q=Av.+da+Saúde,+110,+1000-100+Lisboa'
    },
    {
      name: 'Clínica Vida Plena Porto',
      address: 'Rua da Saúde, 123, 4000-100 Porto',
      phone: '220 123 456',
      mapUrl: 'https://maps.google.com/?q=Rua+da+Saúde,+123,+4000-100+Porto'
    },
    {
      name: 'Clínica Vida Plena Faro',
      address: 'Rua dos Médicos, 28, 8000-100 Faro',
      phone: '289 123 456',
      mapUrl: 'https://maps.google.com/?q=Rua+dos+Médicos,+28,+8000-100+Faro'
    }
  ];

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLoginModal(): void {
    // Logic to open the login modal
  }
}
