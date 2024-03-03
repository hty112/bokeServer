### JS Ajax

```javascript
function load(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list', true);   //异步

    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
        ...
        }
    };

    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            console.log(this.responseText);
        }
    };

    xhr.send();
}
```

### JS Axios


get
```javascript
	function find() {
	    axios({
	        method: "get",
	        url: "/list",
	        params: {
	            name: "ld"
	        }
	    }).then(res => console.log(res))
	        .catch(err => console.log(err));
	
	    axios.get("/list?name='ld'", {
	        timeout: 5000
	    }).then(res => console.log(res))
	        .catch(err => console.log(err));
	}
```

post
```javascript
    function save() {
        axios.post("/save", {
            name: "ld",
            age: 12
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }
```

put
```javascript
    function put() {
        axios.put("/put", {
            name: "ld",
            age: 12
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }
```
delete
```javascript
	function del() {
	    axios.delete("/delete/1").then(res => console.log(res))
	        .catch(err => console.log(err));
	}
```

批量请求数据
```javascript
function findAll() {  
	axios.all([
	    axios.get("/list?age=1"),
	    axios.get("/list?age=2")
	]).then(res => console.log(res))
	.catch(err => console.log(err));
}
```

自定义请求头
```javascript
	const config = {
		headers: {
			Authorization: "token"
		}
	}
	
	function save() {
	    axios.post("/save", {
	        name: "ld",
	        age: 12
	    }, config).then(res => console.log(res))
	        .catch(err => console.log(err));
	}
```

请求拦截：
```javascript
	axios.interceptors.request.use(
		config => {
		}
	)
```
Axios实例化：
```javascript
	const axiosInstance = axios.create({
		baseURL: ""
	})
	
	axiosInstance.get()
```