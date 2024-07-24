run-database:
	docker-compose -f docker-compose-run-database.yaml down
	docker-compose -f docker-compose-run-database.yaml stop
	docker-compose -f docker-compose-run-database.yaml build --force-rm
	docker-compose -f docker-compose-run-database.yaml up

run-api:
	docker build -t book-auction-api-local -f Dockerfile .
	docker run -p 8080:8080 -it  book-auction-api-local