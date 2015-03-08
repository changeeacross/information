# API documentation
## How to be authenticated?
Some APIs can only be used by authenticated users. You can be authenticated by following steps:

1. use Token Exchange API below to get our jwt (json web token)
2. set your token in headers by folloing format:
```
	Authorization: Bearer [token]
```
where [token] should be replace with your token.
2. (deprecated) set your token in url by `?token`

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
`POST /info`

Create an new info (auth required).

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
	"down": 0,
	"up": 0,
	"tags": [
		"共乘",
		"ride sharing"
	]
}
```

### Search Info
`GET /info?tag`

Search info by tag.

- params
	- tag {String, required} ... name of tag. The tag should be completed.

- reponse 200 (application/json)
```json
[
	{
		"_id": "54fac4cb17d4978d66e7a709",
		"title": "Carpo 共乘 - 找到您的共乘夥伴",
		"link": "http://carpo.co",
		"description": "xxxxxx",
		"image": "http://d2943dy236fnij.cloudfront.net/square_logo.png",
		"__v": 0,
		"createdAt": "2015-03-07T09:28:43.229Z",
		"down": 0,
		"up": 0,
		"tags": [
			"共乘",
			"aa",
			"ride sharing"
		]
	}
]
```

### Vote Info
`GET /info/:_id/vote?type`

Vote an info with _id. (auth required)

- params
	- type {String, required} ... should be `up` or `down`, default to `up`.
	- _id {ObjectId, required} ... info _id.

- reponse 204 (no content)

### Delete Info
`DELETE /info/:_id/

Delete an info with _id. (auth required)

- params
	- _id {ObjectId, required} ... info _id.

- reponse 204 (no content)



## Tag
### Tag Search
`GET /tag?name`

Search tags containing name.

- params
	- name {String, required} ... name of tag. Part of name can work.

- response 200 (application/json)
```json
[
{
	"_id": "54fac4cb39a20451f4d5afc8",
	"name": "aa",
	"numOfInfo": 1,
	"createdAt": "2015-03-07T20:04:19.314Z",
	"count": 8
	}
]
````

# My
### List My Info
`GET /my/info`

List infos which are posted by me. (auth required)

- response 200 (application/json)
```json
[
	{
	"_id": "54fb65151624160352bc3cbf",
		"title": "Carpo 共乘 - 找到您的共乘夥伴",
		"link": "http://carpo.co",
		"description": "xxxxxx",
		"image": "http://d2943dy236fnij.cloudfront.net/square_logo.png",
		"_poster": "54fb4e93c2a4a8292b0f4de7",
		"downVote": 0,
		"upVote": 0,
		"__v": 0,
		"createdAt": "2015-03-07T20:52:37.531Z",
		"down": 0,
		"up": 0,
		"tags": [
			"共乘",
			"ride sharing"
		]
	}
]
```

### List My Vote
`GET /my/info`

List my votes. (auth required)

- response 200 (application/json)
```json
[
	{
		"_id": "54fb86c2eacba15f7e1a1f2c",
		"_fromUser": "54fb4e93c2a4a8292b0f4de7",
		"_info": "54fb7aef062ebe7969ba03e4",
		"__v": 0,
		"type": "down",
		"createdAt": "2015-03-07T23:16:18.080Z"
	}
]

```


## Token
### Token Exchange
`POST /token/exchange`

Exchange Token from other services (ex: fb).

- request (application/json)
```json
{
	"provider": "facebook",
	"token": "xxxxxx",
}
```

- response 200 (text)
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU0ZmI0ZTkzYzJhNGE4MjkyYjBmNGRlNyIsImlhdCI6MTQyNTc1NTc5NSwiZXhwIjoxNDI2MzYwNTk1fQ.HWjzorJaznmsmLL01jXvkDKqPOFz_62TDs95fRarGcM
```