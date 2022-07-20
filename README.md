# Oauth2-fa-proxy
> A reverse proxy and static file server that provides authentication using Providers (Google, GitHub, and others) to validate accounts by email, domain or group.

Oauth2 proxy with FusionAuth as an SSO

### What does it do?

Oauth2-fa-proxy is a transparent authentication proxy that integrates with the [FusionAuth](https://github.com/fusionauth) authentication service.


Our primary use case is reverse proxy: this means that you may setup a defense-in-depth and protect API resources behind this proxy, 
with users authenticated against FusionAuth. This enables the creation of stateless microservices that can be verified through a network layer that authenticates the requests and asks you to login if you are not authorized.

The reverse-proxy service will proxy all your requests and if authentication is required but missing then the user is asked to log in and redirected to the authentication provider, or if it already been authenticated then it will be redirected to the upstream server.


## Features

* Single Sign On Capabilities
* Can be integrated with mutiple services
* Can be configured with other providers like [KeyCloak](https://github.com/keycloak/keycloak)
* Stateless Microservice
* Keep separation of concerns
* Build your application without adding code to secure your routes
* Work both for frontends and backends 


## Getting started

To run Oauth2-fa-proxy, you can use the Docker image by running:
     
    docker-compose -f docker-compose.yaml -f docker-compose-nginx.yaml <command>
    
Alternatively

    make nginx-<command> (eg make nginx-up, make nginx-down)

Access one of the following URLs to initiate a login flow:

    - http://oauth2-proxy.localhost
    - http://httpbin.oauth2-proxy.localhost
   
The OAuth2 Proxy itself is hosted at http://oauth2-proxy.oauth2-proxy.localhost
> **Note** , the above URLs should work with Chrome, but you may need to add hosts entries for other browsers

    - 127.0.0.1 oauth2-proxy.localhost
    - 127.0.0.1 httpbin.oauth2-proxy.localhost
    - 127.0.0.1 oauth2-proxy.oauth2-proxy.localhost

## Oauth2 endpoints
 * **/oauth2/sign_in** - the login page, which also doubles as a sign out page (it clears cookies)
 * **/oauth2/sign_out** - this URL is used to clear the session cookie
 * **/oauth2/start** - a URL that will redirect to start the OAuth cycle
 * **/oauth2/callback** - the URL used at the end of the OAuth cycle. The oauth app will be configured with this as the callback url.
 * **/oauth2/userinfo** - the URL is used to return user's email from the session in JSON format.
 * **/oauth2/auth** - only returns a 202 Accepted response or a 401 Unauthorized response; for use with the Nginx auth_request directive




## Nginx Configuration
> It is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It is used for routing unauthorized requests to oauth2 proxy directly without buttons

```
server {
  listen      80;
  server_name httpbin.oauth2-proxy.localhost;

  auth_request /internal-auth/oauth2/auth;

  # If the auth_request denies the request (401), redirect to the sign_in page
  # and include the final rd URL back to the user's original request.
  error_page 401 = http://oauth2-proxy.oauth2-proxy.localhost/oauth2/sign_in?rd=$scheme://$host$request_uri;

  # Alternatively send the request to `start` to skip the provider button
  # error_page 401 = http://oauth2-proxy.oauth2-proxy.localhost/oauth2/start?rd=$scheme://$host$request_uri;

  location / {
    proxy_pass http://httpbin/;
  }

  # auth_request must be a URI so this allows an internal path to then proxy to
  # the real auth_request path.
  # The trailing /'s are required so that nginx strips the prefix before proxying.
  location /internal-auth/ {
    internal; # Ensure external users can't access this path

    # Make sure the OAuth2 Proxy knows where the original request came from.
    proxy_set_header Host       $host;
    proxy_set_header X-Real-IP  $remote_addr;

    proxy_pass http://oauth2-proxy:4180/;
  }
}

```

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/oauth2-fa-proxy)


## To generate your own unique API key for .env, you could use any of the following

```
echo "your-secret-key" | md5sum
```

OR

```
uuidgen
```

Copy the `sample.env` and rename it as `.env`

## To start the FusionAuth Services

```
chmod +x install.sh
sudo ./install.sh
```

TODOS
----------------------------------
There is still quite some room for improvement:

* [x] Understand Oauth2 spec
* [x] Create POC for securing dummy services 
* [ ] Node service with Oauth2 
* [ ] Deploy an instance of Oauth2 proxy
* [ ] Benchmark the proxy using testing tool
* [ ] Integrate with existing services
    -  [ ] UCI ( UCI Web Channel)
    -  [ ] YAUS ( Yet Another URL shortener)
    -  [ ] Shiksha Platform
