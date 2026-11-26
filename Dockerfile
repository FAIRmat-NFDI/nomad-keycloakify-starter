ARG KEYCLOAK_VERSION=26.8.2



# Build the Keycloak theme and package it into a JAR file
FROM node:20-alpine AS theme-builder

RUN apk update \
 && apk add --no-cache openjdk17 maven
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build-keycloak-theme


# Build the Keycloak image with the theme JAR file included
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS builder


# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

COPY ./addons/keycloak-orcid.jar /opt/keycloak/providers/
COPY --from=theme-builder /app/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/

# Build-time options only. Runtime options (hostname, DB host, credentials)
# are provided by the Keycloak CR / Kubernetes Secrets, never baked into the image.
# No keystore needed: TLS is terminated at the nginx ingress (Let's Encrypt via cert-manager)
RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]


# Final image for production use
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}

COPY --from=builder /opt/keycloak/ /opt/keycloak/

# The operator runs `start --optimized` when spec.startOptimized is true
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
