import { css, useTheme } from '@emotion/react'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import { useState } from 'react'

export default function Product(props) {
  const [session] = useSession()
  const theme = useTheme()
  const color = {
    primary:
      props.origin == 'blocket'
        ? theme.colors.b_primary
        : props.origin == 'tradera'
        ? theme.colors.t_primary
        : theme.colors.s_primary,
    secondary:
      props.origin == 'blocket'
        ? theme.colors.b_secondary
        : props.origin == 'tradera'
        ? theme.colors.t_secondary
        : theme.colors.s_secondary,
  }
  const [heartColor, setHeartColor] = useState(theme.colors.white)

  const toggleHeartColor = () => {
    heartColor == theme.colors.white
      ? (setHeartColor(theme.colors.b_primary), saveItem())
      : setHeartColor(theme.colors.white)
  }

  const saveItem = () => {
    // const res = await axios
    //   .post('/api/saveItem', {
    //     credentials: {
    //       accessToken: session.accessToken,
    //       userEmail: session.user.email,
    //     },
    //     itemInfo: props,
    //   })
    //   .catch((e) => {
    //     if (e.response.status == 401) {
    //       //token is incorrect
    //       return { authorize: { status: 'Not authenticated' } }
    //     }
    //   })
    // console.log('savetItem: ', res.data)
  }

  return (
    <div
      css={css`
        padding-top: 60%; //having a fixed aspect ratio. cool!!
        background-color: ${color.secondary};
        filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
        margin: 25px;
        border-radius: 8%;
        ${theme.mq[2]} {
          //768px
          margin: 8px;
          border-radius: 5%;
        }
        * {
          user-select: none;
        }
      `}
    >
      <div
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          :hover {
            .image-logo {
              width: 35px;
              height: 35px;
            }
            .image-line {
              width: 45px;
              height: 35px;
            }
            ${theme.mq[0]} {
              //1050px
              .image-logo {
                width: 25px;
                height: 25px;
              }
              .image-line {
                width: 35px;
                height: 25px;
              }
            }
            ${theme.mq[2]} {
              //576px
              .image-logo {
                // no change in size => no hover effect on mobile
                width: 20;
                height: 20px;
              }
              .image-line {
                width: 30px;
                height: 20px;
              }
            }
          }
        `}
      >
        <div
          className="image-line"
          css={css`
            position: absolute;
            top: -8px;
            left: 40px;
            width: 35px;
            height: 25px;
            transition: all 0.5s ease;
            ${theme.mq[0]} {
              //1050px
              width: 30px;
              height: 20px;
            }
          `}
        >
          <Image src={`/${props.origin}-line.svg`} layout="fill" />
        </div>
        <div
          css={css`
            width: 45%;
            position: relative;
          `}
        >
          <p
            css={css`
              margin: 0 5px;
              position: absolute;
              top: 20%;
              left: 50%;
              transform: translate(-50%);
              width: 100%;
              max-height: 40%;
              overflow: auto;
              &::-webkit-scrollbar {
                width: 6px;
                height: 0;
                background: transparent; // Chrome/Safari/Webkit
              }
              &::-webkit-scrollbar-thumb {
                background: ${color.primary};
              }
              ${theme.mq[3]} {
                //576px
                max-height: 50%;
              }
            `}
          >
            {props.description}
          </p>
          <div
            css={css`
              position: absolute;
              width: 100%;
              bottom: 10%;
              color: green;
            `}
          >
            <h3>{props.price ? props.price + ' kr' : ''}</h3>
          </div>
          <div
            className="image-logo"
            css={css`
              position: absolute;
              bottom: 5px;
              left: 40%;
              width: 30px;
              height: 30px;
              transition: all 0.2s ease;
              ${theme.mq[0]} {
                //1050px
                width: 20px;
                height: 20px;
              }
            `}
          >
            <Image
              src={`/${props.origin}-img.svg`}
              layout="fill"
              alt={props.origin}
            />
          </div>
        </div>
        <div
          css={css`
            width: 55%;
            position: relative;
            left: 1px; // fixing a minor bug
            border-radius: 8%;
            overflow: hidden;
            cursor: pointer;
            ${theme.mq[2]} {
              //768px
              border-radius: 5%;
            }
          `}
          onClick={() => window.open(props.url)}
        >
          <Image
            src={props.img ? props.img : '/no-image.svg'}
            layout="fill"
            alt={props.origin}
          />
        </div>
        {session && (
          <div
            css={css`
              position: absolute;
              width: 10%;
              height: 10%;
              right: 5%;
              bottom: 3%;
              cursor: pointer;
            `}
            onClick={() => toggleHeartColor()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 44.194 38.348"
            >
              <path
                id="Path_25"
                data-name="Path 25"
                d="M23.775,17.459a12.034,12.034,0,0,1,2.247-3.245A10.331,10.331,0,0,1,39.774,13.5a12.926,12.926,0,0,1,4.847,10.086A9.391,9.391,0,0,1,43.277,28.2a33.456,33.456,0,0,1-5.9,7.612,98.4,98.4,0,0,1-13.2,11.061c-.207.151-.365.319-.692.088a96.133,96.133,0,0,1-14.3-12.181,33.5,33.5,0,0,1-4.834-6.4c-2.307-4.074-1.638-7.979.663-11.756a10.762,10.762,0,0,1,7.486-5.25,10.2,10.2,0,0,1,10.954,5.48C23.542,17.022,23.631,17.188,23.775,17.459Z"
                transform="translate(-1.667 -9.962)"
                fill={heartColor}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
