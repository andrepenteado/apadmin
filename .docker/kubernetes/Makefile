# Fazer o deploy do login para depois fazer o deploy dos outros serviços.
# E antes de expor o serviço, verificar se o deploy foi concluído.

deploy:
	kubectl apply -f 00-namespace.yml          \
	              -f 01-secret.yml             \
				  -f 02-deployment-backend.yml \
				  -f 02-deployment-frontend.yml

expor:
	kubectl apply -f 03-ingress.yml

delete:
	kubectl delete namespace apadmin

log-backend:
	kubectl logs -n apadmin service/admin-backend -f

log-frontend:
	kubectl logs -n apadmin service/admin-frontend -f

update:
	kubectl rollout restart deployment admin-backend -n apadmin
	kubectl rollout restart deployment admin-frontend -n apadmin
	kubectl rollout status deployment admin-backend -n apadmin
	kubectl rollout status deployment admin-frontend -n apadmin
	kubectl rollout history deployment admin-backend -n apadmin
	kubectl rollout history deployment admin-frontend -n apadmin

get:
	kubectl get all -n apadmin
