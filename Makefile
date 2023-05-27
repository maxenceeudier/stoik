prod:	
		cd api && docker-compose up --build 

dev: 
		cd api && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

re-prod:	stop prod

stop:	
		cd api && docker-compose -f docker-compose.yml down

clean:
	docker system prune -a && docker volume prune

.PHONY: prod  stop re-prod clean