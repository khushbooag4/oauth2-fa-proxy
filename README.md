# oauth2-fa-proxy
Oauth2 proxy with FA as an SSO

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/yaus)


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
