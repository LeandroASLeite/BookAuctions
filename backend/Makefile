run-database:
	docker-compose -f docker-compose-run-database.yaml down
	docker-compose -f docker-compose-run-database.yaml stop
	docker-compose -f docker-compose-run-database.yaml build --force-rm
	docker-compose -f docker-compose-run-database.yaml up -d
 
run-api:
	docker build -t  book-auction-api-local -f Dockerfile . 
	docker run --network backend_my-networks -p 8081:8080 -it  -d book-auction-api-local 