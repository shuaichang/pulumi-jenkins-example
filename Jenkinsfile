pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'git@github.com:hryang/pulumi-jenkins-example.git', branch: 'master', poll: true)
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'curl -fsSL https://get.pulumi.com | sh'
        sh '$HOME/.pulumi/bin/pulumi version'
      }
    }

    stage('Pulumi up') {
      steps {
        nodejs('nodejs 15.3.0') {
          sh 'cd infrastructure && npm install'
          sh 'pulumi stack select ${PULUMI_STACK} --cwd infrastructure/'
          sh 'pulumi up --yes --cwd infrastructure/'
        }

      }
    }

  }
}