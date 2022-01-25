import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'

function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
}

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['100']};
                    font-size: 52px;
                    font-weight: 800;
                }
            `}</style>
        </>
    )
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h2">Olá!!</Title>
//             <h2>Teste de textos</h2>
//         </div>
//     );
// }
// export default HomePage

export default function PaginaInicial() {
    const username = 'GeyzonErik';

    return (
        <>
            <GlobalStyle />
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['400'],
                    backgroundImage: 'url(https://images.pexels.com/photos/4338273/pexels-photo-4338273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['300'],
                    }}
                >

                    {/* Formulário */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}>
                        <Titulo tag="h2">Come on in</Titulo>

                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['400'] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            placeholder="GitHub User"
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals['100'],
                                    mainColor: appConfig.theme.colors.primary['050'],
                                    mainColorHighlight: appConfig.theme.colors.primary['050'],
                                    backgroundColor: appConfig.theme.colors.primary['050'],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Login'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['300'],
                                mainColor: appConfig.theme.colors.primary['500'],
                                mainColorLight: appConfig.theme.colors.primary['400'],
                                mainColorStrong: appConfig.theme.colors.primary['200'],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals['300'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals['300'],
                            borderRadius: '3px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '15px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.primary['400'],
                                backgroundColor: appConfig.theme.colors.primary['050'],
                                padding: '3px 10px',
                                borderRadius: '5px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
