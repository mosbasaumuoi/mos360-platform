// ============================================
// GOOGLE SHEET ENGINE
// Runtime Google Sheet fetcher
// ============================================

// ============================================
// BUILD SHEET URL
// ============================================

function buildSheetUrl(

    sheetId,
    tabName

) {

    return `

https://opensheet.elk.sh/${sheetId}/${tabName}

    `.trim();
}

// ============================================
// FETCH SHEET TAB
// ============================================

export async function fetchSheetTab({

    sheetId,

    tabName

}) {

    try {

        const response =

            await fetch(

                buildSheetUrl(

                    sheetId,
                    tabName
                )
            );

        if (!response.ok) {

            throw new Error(
                "Fetch failed"
            );
        }

        const data =

            await response.json();

        console.log(

            "GOOGLE SHEET DATA",

            tabName,

            data

        );

        return {

            ok: true,

            data
        };

    } catch (error) {

        console.error(

            "GOOGLE SHEET ERROR",

            error
        );

        return {

            ok: false,

            error
        };
    }
}