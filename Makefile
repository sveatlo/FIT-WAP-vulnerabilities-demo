.PHONY: all
all: build


.PHONY: build
build:
	@echo "TBD"

.PHONY: dev
dev:
	docker-compose up


.PHONY: clean
clean:
	docker-compose down
	$(MAKE) -C frontend clean
	$(MAKE) -C backend clean

