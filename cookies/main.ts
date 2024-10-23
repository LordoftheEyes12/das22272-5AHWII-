
import { Response, serve } from "https://deno.land/std@0.106.0/http/server.ts";
//import * as mod from "https://deno.land/std@0.224.0/http/cookie.ts";
import { CookieJar } from "https://deno.land/x/cookies@1.0.0/mod.ts";
import {dayOfYear, dayOfYearUtc, parse } from "https://deno.land/std@0.224.0/datetime/mod.ts"

const server = serve({ port: 3000 });
console.log("Server listening on port 3000");

for await (const req of server) {
  const res: Response = {
    status: 404,
    headers: new Headers([
      ["Content-Type", "text/plain"],
    ]),
  };
  const cookies = new CookieJar(req, res, {
    keys: ["secret", "keys"],
    secure: true,
  });

  // Get a cookie (sign it to protect against spoofing)
  const lastVisit = cookies.get("LastVisit", { signed: true });
  console.log("cookie " +lastVisit);
  if (!lastVisit) {
    res.body = "Welcome first time user!";
    // Set the cookie to a value
    const value = Date.now();
    //const date0 = new Date(Date.now());
    //console.log(date0);
    //const date1 = date0.toLocaleDateString();
    //const date3 = date0.toLocaleTimeString();
    //const finalDate = date1 + " " + date3;
    //console.log("aaaa " +date0.toTimeString());
    //console.log(finalDate);  
    //console.log(dayOfYear(date0));
    console.log(value.toLocaleString());
    cookies.set("LastVisit", value, { signed: true });
  } else {
    const timestamp = lastVisit;
    //console.log("timestamp " + timestamp);
    const time : number = parseInt(timestamp);  
    //console.log(Date(time));
    const timevalue = Date(time);
   // const tryout = Date.parse(timestamp);
    //const date2 = new Date(tryout);
    //console.log("test" + dayOfYearUtc(timestamp));
    //console.log(tryout);
    //console.log(date2);
   // console.log(timestamp);
    res.body =
      `Welcome back! Nothing much changed since your last visit at ${timevalue}.`;
  }

  req.respond(res);
}