var {data} = require("sdk/self");
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "*",
	contentScriptFile: data.url("personalize.js")
});