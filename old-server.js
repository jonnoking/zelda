// azure web sites workaround - expects either app.js or server.js
// http://willi.am/blog/2014/05/07/running-express-4-sites-on-azure/
// https://azure.microsoft.com/en-us/documentation/articles/cloud-services-nodejs-develop-deploy-express-app/
require('./bin/www');

// or
// 

// put this in web.config in root
/*

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>

    <!-- 
      By default IIS will block requests going to the bin directory for security reasons. 
      We need to disable this since that's where Express has put the application entry point. 
    -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin" />
        </hiddenSegments>
      </requestFiltering>
    </security>

    <handlers>
      <!-- Indicates that the www file is a node.js entry point -->
      <add name="iisnode" path="/bin/www" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^bin\/www\/debug[\/]?" />
        </rule>

        <!-- 
          First we consider whether the incoming URL matches a physical file in the /public folder. 
          This means IIS will handle your static resources, and you don't have to use express.static 
        -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- All other URLs are mapped to the node.js entry point -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="/bin/www"/>
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>

*/