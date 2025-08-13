FROM docker.io/library/alpine:edge AS git
ARG TAG
ENV TAG=${TAG:-main}
RUN apk update && apk add --no-cache \
	git
WORKDIR /
RUN git -c advice.detachedHead=false clone --branch $TAG --depth=1 --recurse-submodules https://github.com/pfm-powerforme/rustfs-frontend.git source
WORKDIR /source/


FROM docker.io/library/node:lts-alpine AS builder
ARG TAG
ENV TAG=${TAG:-main} \
    VERSION=${TAG:-dev-0.0.0}
RUN apk update && apk add --no-cache \
	gcc musl-dev g++ make py3-pip
COPY --from=git /source/ /build/
WORKDIR /build/
RUN npm ci
RUN npm run generate

FROM scratch AS runtime
COPY --from=builder /build/.output/public/ /frontend/
CMD [""]