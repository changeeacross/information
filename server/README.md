# API documentation

## Link
`GET /link/?url`

Fetch the info of the website from the url.

- params 
	- url { required, String } ... ex: http://carpo.co

- response 200 (application/json)

```json
{
"title": "Carpo 共乘 - 找到您的共乘夥伴",
"link": "http://carpo.co",
"description": "Carpo 共乘是一個方便、安全的共乘媒合平台，使用者可以用經濟實惠的方式找到一起搭車的夥伴，相互評價的功能更讓共乘更安全有保障。共乘不但可以省油錢、省交通費，更可以對地球環保盡一份心力。馬上用 Facebook 快速登入，一起來 Carpo 共乘找到您的共乘夥伴吧！",
"keywords": [
"共乘",
" 共乘網",
" carpooling",
" ride sharing"
],
"image": "http://d2943dy236fnij.cloudfront.net/square_logo.png"
}
```

## Info
### Create Info
` POST /info`

Create an new info.

- request (application/json)
```json
{
	"title": "Carpo 共乘 - 找到您的共乘夥伴",
	"link": "http://carpo.co",
	"description": "xxxxxx",
	"tags": [
		"共乘",
		"ride sharing"
	],
	"image": "http://d2943dy236fnij.cloudfront.net/square_logo.png"
}
```

- response 200 (application/json)
```json
{
"__v": 0,
"title": "Carpo 共乘 - 找到您的共乘夥伴",
"link": "http://carpo.co",
"description": "xxxxxx",
"image": "http://d2943dy236fnij.cloudfront.net/square_logo.png",
"_id": "54fabf78855100d85d7f0f2b",
"createdAt": "2015-03-07T09:06:00.813Z",
"downVote": 0,
"upVote": 0,
"tags": [
"共乘",
"ride sharing"
]
}
```

## Auth
### Token Exchange
` POST /auth/token/exchange`

Exchange Token from other services (ex: fb).

- request (application/json)
```json
{
	"provider": "facebook",
	"token": "xxxxxx",
}
```

- response 200 (application/json)
```json
{

}
```