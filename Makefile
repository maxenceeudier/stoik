dev:	
	cd api && docker-compose up --remove-orphans --build 

re-dev:	stop dev

stop:	
	cd api && docker-compose -f docker-compose.yml down

clean: stop
	docker system prune -a && docker volume prune

.PHONY: dev stop re-dev clean