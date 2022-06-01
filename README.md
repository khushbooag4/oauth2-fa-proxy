# oauth2-fa-proxy
Oauth2 proxy with FA as an SSO


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
