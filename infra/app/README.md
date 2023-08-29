# CKANGPT UI

## Deploy

Deployment is handled via ArgoCD

## Secrets

```
kubectl create secret docker-registry ghcr-pull-secret \
  --docker-server=ghcr.io \
  --docker-username=<github-username> \
  --docker-password=<github-personal-access-token> \
  --namespace=ui
```

```
htpasswd -c auth <USERNAME>
kubectl -n ui create secret generic basic-auth --from-file=auth
rm auth
```
