#!/bin/bash

# Verifica se o usuário passou uma mensagem de commit
if [ -z "$1" ]; then
  echo "⚠️  Use: ./push.sh \"Sua mensagem de commit\""
  exit 1
fi

# Adiciona, commita e envia para a branch master
git add .
git commit -m "$1"
git push origin master

