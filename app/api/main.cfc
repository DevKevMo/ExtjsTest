<cfcomponent extends="base">

    <cffunction name="login" access="remote" httpmethod="GET" returnFormat="JSON" description="set Session Id"
        auth="Kevin Moritz">
        <cfargument name="name" default="{username:"",password:""}"
            hint="values for username and password to set the SessionId" required="yes" type="strings" />
        <cfset data=deserializeJSON(userData) />
        <cfset returnStr=structNew() />
        <cfset returnStr.error=true />
        <cfset returnStr.message="error: no user found" />
        <cfset returnStr.Data={} />

        <cfquery name="userExistQuery" datasource="ora8_azubi">
            SELECT ID
            FROM MORITZK_USER
            WHERE USERNAME = '#data.username#' AND PASSWORD = '#hash("#data.password#")#'
        </cfquery>

        <cfif userExistQuery.recordCount>
            <cfset SID=hash(userExistQuery.ID+now()) />
            <cfquery name="updateSessionIdQuery" datasource="ora8_azubi">
                UPDATE MORITZK_USER
                SET SESSIONID = '#SID#'
                WHERE ID = #userExistQuery.ID#
            </cfquery>
            <cfset createFolder("D:\\wwwroot\azubi_kmoritz\exttraining\test\app\user\" & userExistQuery.ID) />
            <cfset returnStr.Data={"sId":SID,"uId": userExistQuery.ID} />
            <cfset returnStr.message="success: update SessionId" />
            <cfset returnStr.error=false />
        </cfif>
        <cfreturn returnStr>
    </cffunction>

</cfcomponent>