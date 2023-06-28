<cfcomponent>
    <cffunction name="addCountries" access="remote" returnFormat="JSON">
        <cfargument name="dataObj" />
        <cfset data=deserializeJSON(dataObj) />
        <cfloop array="#data#" index="i">
            <cfif isDefined("i")>
                <cfquery name="addCountryQuery" datasource="ora8_azubi">
                    INSERT INTO MORITZK_COUNTRY_CODE (NAME, CCA2, CCA3, CURRENCIES_NAME, CURRENCIES_SYMBOL )
                    VALUES ('#i.name#','#i.cca2#','#i.cca3#','#i.currencieName#','#i.currencieSymbol#' )
                </cfquery>
            </cfif>
        </cfloop>
    </cffunction>

    <cffunction name="getCountries" access="remote" returnFormat="JSON">
        <cfquery name="getCountriesQuery" datasource="ora8_azubi">
            SELECT * FROM MORITZK_COUNTRY_CODE
        </cfquery>
        <cfreturn serializeJSON(getCountriesQuery, "row" )>
    </cffunction>
</cfcomponent>