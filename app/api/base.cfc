   <cfcomponent>

       <cffunction name="createFolder" access="remote">
           <cfargument name="root" type="string" hint="path of folder" required="true" />
           <cfif !DirectoryExists(root)>
               <cfset DirectoryCreate(root) />
               <cfif !fileExists(root & ".gitignore" )>
                   <cffile action="write" file="#root#.gitignore" output="*" />
                   <cffile action="append" file="#root#.gitignore" output="!.gitignore" />
               </cfif>
           </cfif>
       </cffunction>

       <cffunction name="createFile" access="remote">
           <cfargument name="root" type="string" required="true" />
           <cfargument name="data" type="string" required="true" />
           <cfargument name="title" type="string" required="true" />

           <cfset fileRoot=root & title />
           <cfset returnStr=structNew() />
           <cfset returnStr.Message="" />
           <cfset returnStr.Error=false />

           <cfif FileExists(fileRoot)>
               <cfset returnStr.Error=true />
               <cfset returnStr.Message="fileExists" />
               <cfelse>
                   <cffile action="write" file="#fileRoot#" output="#data#" />
                   <cfset returnStr.Message="file was created" />
           </cfif>
           <cfreturn returnStr>
       </cffunction>

       <cffunction name="auth" access="remote" httpmethod="GET" returnFormat="JSON">
           <cfargument name="SID" default="" hint="SessionId of from the user logged in" required="yes"
               type="strings" />
           <cfquery name="authUserQuery" datasource="ora8_azubi">
               SELECT ID
               FROM MORITZK_USER
               WHERE SESSIONID = '#SID#'
           </cfquery>

           <cfreturn authUserQuery>
       </cffunction>
   </cfcomponent>