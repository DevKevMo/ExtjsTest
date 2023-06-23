   <cfcomponent>

       <cffunction name="createFolder" access="remote">
           <cfargument name="root" type="string" hint="path of folder" required="true" />
           <cfif DirectoryExists(root)>
               <cfelse>
                   <cfset DirectoryCreate(root)>
           </cfif>
       </cffunction>

       <cffunction name="createFile" access="remote">
           <cfargument name="root" type="string" required="true" />
           <cfargument name="data" type="string" required="true" />
           <cfset returnStr=structNew() />
           <cfset returnStr.Message="" />
           <cfset returnStr.Error=false />
           <cfif FileExists(root)>
               <cfset returnStr.Error=true />
               <cfset returnStr.Message="fileExists" />
               <cfelse>
                   <cffile action="write" file="#root#" output="#data#" />
                   <cfset returnStr.Message="file was created" />
           </cfif>
           <cfreturn returnStr>
       </cffunction>

       <cffunction name="auth" access="remote" httpmethod="GET" returnFormat="JSON">
       </cffunction>
   </cfcomponent>