pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/hryang/pulumi-jenkins-example.git', poll: true)
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
        nodejs(nodeJSInstallationName: 'nodejs 15.3.0') {
          withEnv(["PATH+PULUMI=$HOME/.pulumi/bin"]) {
            sh 'cd infrastructure && npm install'
            sh 'pulumi stack select ${PULUMI_STACK} --cwd infrastructure/'
            sh 'pulumi up --yes --cwd infrastructure/'
          }
        }

      }
    }

  }
}