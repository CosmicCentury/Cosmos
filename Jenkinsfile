pipeline {
  agent any
  stages {
    stage('Initialise and Run') {
      steps {
        bat 'docker-compose down -v'
        bat 'docker-compose up --build -d'
      }
    }

    // stage('Stop and Remove') {
    //   steps {
    //     bat 'docker stop server && docker rm server'
    //   }
    // }

    // stage("Run") {
    //   steps {
    //     bat 'docker run -d --name server -p 5000:5000 -t nodejs'
    //   }
    // }

  }
}