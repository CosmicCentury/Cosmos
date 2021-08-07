pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        bat 'docker build -t nodejs .'
      }
    }

    stage('Stop and Remove') {
      steps {
        bat 'docker stop server && docker rm server'
      }
    }

    stage("Run") {
      steps {
        bat 'docker run -d --name server -p 5000:5000 -t nodejs'
      }
    }

  }
}