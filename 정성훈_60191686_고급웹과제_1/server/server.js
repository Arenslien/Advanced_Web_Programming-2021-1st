const http = require("http");
const fs = require("fs").promises;


let login_info = {};
let user_db = {};


// 기본적인 서버 세팅
http.createServer( async (req, res) => {
    // GET 트랜잭션 관리
    if (req.method === "GET") { 
        // Homepage 기본 화면 read & Head 설정
        if(req.url == "/") {
            console.log("[성공] GET: / ");

            const homeHtml = await fs.readFile("../page/Homework1.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(homeHtml);
        }
        
        // login & Head 설정
        else if (req.url == "/login") {
            console.log("[성공] GET: /login");

            const loginHtml = await fs.readFile("../page/login_form.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(loginHtml);

        }
        
        // github 페이지 요청을 받을 경우 다른 페이지로 이동
        else if (req.url == "/github") {
            console.log("[성공] GET: /github ");
            
            res.writeHead(302, {'Location' : 'https://github.com/arenslien'});
            return res.end();

        }
        
        else if (req.url == "/setting") {
            console.log("[성공] GET: /setting");

            // setting 설정
            const settingHtml = await fs.readFile("../page/setting_form.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(settingHtml);

        }
        
        // sign-up 설정
        else if (req.url == "/sign-up") {
            console.log("[성공] GET: /sign-up ");

            const signupHtml = await fs.readFile("../page/sign-up_form.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(signupHtml);

        }
        
        // setting_nav 설정
        else if (req.url == "/setting_nav") {
            console.log("[성공] GET: /setting_nav ");

            const settingNavHtml = await fs.readFile("../page/setting_nav_form.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(settingNavHtml);

        }
        
        // setting-content 설정
        else if (req.url == "/setting_content") {
            console.log("[성공] GET: /setting_content");

            const settingContentHtml = await fs.readFile("../page/setting_content_form.html");
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            return res.end(settingContentHtml);

        }
        
        // 로그인 관련 GET 요청 처리
        else if (req.url == "/getLoginInfo"){
            console.log("[성공] GET: /getLoginInfo");
            user_db = JSON.parse(await fs.readFile("../user/users.json"));

            for (let i in user_db.user) {
                if(login_info.id == user_db.user[i].id && login_info.password == user_db.user[i].password) {
                    return res.end('success');
                }
            }
            return res.end('failed');
        }
        
        else if (req.url == "/etc") {
            // etc 설정 나중에 추가할 예정
            // const etcHtml = await fs.readFile("../page/etc.html");
            // res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });

            // return res.end(etcHtml);
        } 

        // css 파일 img 파일 js파일 등 여러가지 파일에 대한 req가 올 때 처리하는 코드
        try {
            const data = await fs.readFile(`..${req.url}`);
            res.end(data);
        } catch(error) {
            console.error(error);
        }


    }
    
    // POST 트랜잭션 관리
    else if (req.method === "POST") { 
        // login 정보가 POST를 통해 들어올 때 해당 정보를 서버에 저장함.
        if(req.url == "/login_submit") {
            console.log("[성공] POST: /login_submit");
            req.on('data', (data) => {
                login_info = JSON.parse(data);
                return res.end('ok');
            });
        }
    }
}).listen(3000);

