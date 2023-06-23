<cfcomponent extends="base">
    <cffunction name="addDrawing" access="remote" description="save draw reference" returnFormat="JSON"
        auth="Kevin Moritz">
        <cfargument name="title" default="" hint="title of the image" required="yes" type="strings" />
        <cfargument name="userId" default="" hint="userId over session storage" required="yes" type="number" />
        <cfargument name="dataObj" default="" hint="data array with draw sprites" required="yes" type="strings" />

        <cfset returnStr=structNew() />
        <cfset returnStr.error=true />
        <cfset returnStr.message="" />
        <cfset returnStr.data=[] />

        <cfset folderRoot="D:\\wwwroot\azubi_kmoritz\exttraining\test\app\user\" & userId & "\img\" />
        <cfset fileRoot=folderRoot & title />
        <cfset createFolder(folderRoot ) />
        <!--- return str with Message and and Error status --->
        <cfset createFileStr=createFile(fileRoot, dataObj) />
        <cfif !createFileStr.Error>
            <cfquery name="addDrawing" datasource="ora8_azubi">
                INSERT INTO MORITZK_DRAW (TITLE, LINK, USERID)
                VALUES ('#title#', '#fileRoot#', #userId#)
            </cfquery>
        </cfif>
        <cfset returnStr.message=#createFileStr.Message# />
        <cfset returnStr.error=false />
        <cfreturn returnStr>
    </cffunction>

    <cffunction name="getDraw" access="remote" description="get a list of all drawings" auth="Kevin Moritz">
    </cffunction>


    <cffunction name="deleteDraw" access="remote" description="save draw reference" auth="Kevin Moritz">
    </cffunction>
    <cffunction name="updateDraw" access="remote" description="save draw reference" auth="Kevin Moritz">
    </cffunction>
</cfcomponent>