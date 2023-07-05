<cfcomponent extends="base">
    <cffunction name="addDrawing" access="remote" description="save draw reference" returnFormat="JSON"
        auth="Kevin Moritz">
        <cfargument name="title" default="" hint="title of the image" required="yes" type="strings" />
        <cfargument name="SID" default="" hint="userSession over session storage" required="yes" type="strings" />
        <cfargument name="dataObj" default="" hint="data array with draw sprites" required="yes" type="strings" />
        <cfset userId=auth(SID).userId />
        <cfset returnStr=structNew() />
        <cfset returnStr.error=true />
        <cfset returnStr.message="" />
        <cfset returnStr.data=[] />
        <cfif !isDefined("userId")>
            <cfset root="D:\\wwwroot\azubi_kmoritz\exttraining\test\app\user\" & userId & "\img\" />
            <cfset link="http://dokuwebdev.datasec.de/azubi_kmoritz/exttraining/test/app/user/" & userId & "/img/" &
                title />
            <cfset createFolder(root) />

            <!--- return str with Message and and Error status --->
            <cfset createFileStr=createFile(root, dataObj, title) />

            <cfif !createFileStr.Error>
                <cfquery name="addDrawing" datasource="ora8_azubi">
                    INSERT INTO MORITZK_DRAW (TITLE, LINK, USERID)
                    VALUES ('#title#', '#link#', #userId#)
                </cfquery>
            </cfif>

            <cfset returnStr.message=#createFileStr.Message# />
            <cfset returnStr.error=createFileStr.Error />
            <cfelse>
                <cfset returnStr.message="userId not found" />
        </cfif>

        <cfreturn returnStr>
    </cffunction>

    <cffunction name="getDraw" access="remote" description="get the link and title of drawings" auth="Kevin Moritz"
        returnFormat="JSON">
        <cfargument name="SID" default="" hint="SessionId of from the user logged in" required="yes" type="strings" />
        <cfset userId=auth(SID).userId />
        <cfdump var="#userId#" format="html" output="#expandPath('./returnStr_dump.html')#" />
        <cfquery name="getDrawingQuery" datasource="ora8_azubi">
            SELECT ID, TITLE, LINK
            FROM MORITZK_DRAW
            WHERE USERID = #userId#
        </cfquery>
        <cfreturn getDrawingQuery>
    </cffunction>


    <cffunction name="deleteDraw" access="remote" description="delete draw reference" auth="Kevin Moritz">
        <cfargument name="record" default="" hint="record of drawing in grid" required="yes" type="string" />
        <cfargument name="userSession" default="" required="yes" type="string" />
        <cfset data=deserializeJSON(record) />
        <cfset userId=auth(SID).userId />
        <cfset root="D:\\wwwroot\azubi_kmoritz\exttraining\test\app\user\" & userId & "\img\" & data.title />
        <cfset removeFile(root) />
        <cfquery name="deleteDrawing" datasource="ora8_azubi">
            DELETE FROM MORITZK_DRAW WHERE ID = #data.ID#
        </cfquery>
    </cffunction>
    <cffunction name="updateDraw" access="remote" description="save draw reference" auth="Kevin Moritz">
    </cffunction>
</cfcomponent>