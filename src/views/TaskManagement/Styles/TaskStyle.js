export const style = {
    mainCard: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 2,
    },
    mainHead: {
        fontWeight: 500,
        color: '#1E1F21',
        minHeight: '72px'
    },
    typo1: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 500,
        color: '#6d6e6f',
        mb: '4px'
    },
    typo2: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '32px',
        lineHeight: '40px',
        fontWeight: 400,
        color: '#1e1f21',
        mb: '12apx'
    },
    toggleBtn: {
        // backgroundColor: 'ButtonShadow',
        fontSize: '12px',
        height: '28px',
        lineHeight: '28px',
        padding: "0 8px",
        fontWeight: 600,
        color: '#6d6e6f',
        display: 'flex', flexDirection: 'row', cursor: 'pointer'
    },
    selectStyle: {
        color: '#6d6e6f',
        fontWeight: 500,
        backgroundColor: '#F9F8F8',
        borderColor: 'transparent',
        borderRadius: 5,
        paddingLeft: 3,
        paddingRight: 5,
        cursor: 'pointer',
        '& :option': {
            fontWeight: 500,
        },
        '& :selected': {
            fontWeight: 500
        }
    },
    buttonTab: {
        display: 'flex',
        backgroundColor: '#f9f8f8',
        height: '48px',
        width: '30%',
        borderRadius: '60px',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '4px'
    }
}