pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        bat 'docker build -t nodejs .'
      }
    }

    stage('Run') {
      steps {
        try{
          bat 'docker stop server && docker rm server'
        }catch(error){
        }finally{
          bat 'docker run -d --name server -p 5000:5000 -t nodejs'
        }
      }
    }

  }
}