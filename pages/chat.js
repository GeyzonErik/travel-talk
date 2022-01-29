import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import appConfig from '../config.json';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5NDMwOSwiZXhwIjoxOTU5MDcwMzA5fQ.wTA_tg5Hq8PVoxAtWvKuhGTDDOApWo7BAxuFTots268';
const SUPABASE_URL = 'https://acvwjzfafosyuhjpsbxn.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagem(data)
            });

    }, [listaMensagem]);

    function handleNovaMensagem(novaMensagem) {
        const message = {
            from: 'GeyzonErik',
            text: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([message])
            .then(({ data }) => {
                setListaMensagem([
                    data[0],
                    ...listaMensagem
                ]);
            });

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals['300'],
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.primary['050'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: '#F3F3F3',
                                marginRight: '12px',
                                color: appConfig.theme.colors.primary['200'],
                            }}
                        />
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            label={
                                <Icon
                                    name="FaTelegramPlane"
                                    size='1cm'
                                />
                            }
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    variant='heading5'
                    styleSheet={{
                        color: appConfig.theme.colors.primary['550']
                    }}
                >
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    styleSheet={{
                        color: appConfig.theme.colors.primary['550']
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <a
                                href={`https://github.com/${mensagem.from}`}
                                target='_blank'
                            >
                                <Image
                                    styleSheet={{
                                        width: '46px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        hover: {
                                            transform: 'rotate(45deg)',
                                            transition: 'linear 0.32s',
                                        },
                                        transition: 'linear 0.32s',
                                    }}
                                    src={`https://github.com/${mensagem.from}.png`}
                                />
                            </a>
                            <Text
                                tag="strong"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary['200'],
                                    fontSize: '18px',
                                }}
                            >
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '12px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        <Text
                            styleSheet={{
                                color: '#F3F3F3',
                                marginLeft: '1.3rem',
                            }}
                        >
                            {mensagem.text}
                        </Text>
                    </Text>
                )
            })}

        </Box>
    )
}
