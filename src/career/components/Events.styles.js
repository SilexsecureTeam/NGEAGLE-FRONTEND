import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  from {
    /* transform: rotate(0deg); */
    transform: scale(1);
  }

  to {
    transform: scale(1.05);
    /* transform: rotate(360deg); */
  }

`

export const StylesDIV5 = styled.div`
  min-height: 70vh;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(243, 246, 249, 1);
  /* overflow-x: hidden; */

  .content {
    width: 90vw;
    // display: grid;
    // grid-template-columns: 60% 40%;
    gap: 2em;
    // margin-left: 20px;

    @media (max-width: 1150px) {
      width: 90dvw;
      grid-template-columns: 1fr;
      justify-content: center;
      padding: 0 30px;
      /* border: 2px solid black; */
    }

    /* Offer Content Divition container */
    .offerContent {
      width: 85%;
      margin: 0;

      @media (max-width: 500px) {
        margin: 0 auto;
        width: 100%;
      }
    }

    /* News Content Divition container */
    .news {
      width: 95%;
      margin: 0;

      @media (max-width: 500px) {
        margin: 0 auto 40px;
        /* width: auto; */
      }
    }

    .offerImg {
      width: 100%;
      height: 280px;
      display: flex;

      .state {
        width: 7.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid;

        p {
          transform: rotate(90deg);
          color: #fff;
          font-weight: 500;
          font-size: 20px;
        }
      }
    }

    .newsHeader {
      display: flex;
      margin: 15px 0;
      align-items: end;
      justify-content: space-around;
      /* border: 2px solid black; */

      img {
        margin-right: 20px;
        width: clamp(2.8em, 4vw, 4em);
        height: clamp(2.8em, 4vw, 4em);
      }

      p {
        font-size: clamp(1em, 1.2vw, 2em);
        margin: 0;
        padding: 0;
      }

      span {
        font-size: clamp(1em, 1.6vw, 2em);
        color: #5b5959;
        font-weight: 800;
        font-family: one-fonts-bold;
      }

      a {
        /* text-decoration: none; */
        color: #790030;
        font-weight: 600;
      }
    }

    .offerHeader {
      margin: 15px 0;

      img {
        margin-right: 20px;
        width: clamp(2.8em, 4vw, 4em);
        height: clamp(2.8em, 4vw, 4em);
      }

      p {
        font-size: clamp(1em, 1.2vw, 2em);
        margin: 0;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
      }

      span {
        font-size: clamp(1em, 1.6vw, 2em);
        color: #5b5959;
        font-weight: 800;
        font-family: one-fonts-bold;
      }

      a {
        /* text-decoration: none; */
        color: #790030;
        font-weight: 600;
      }
    }

    .newsHeader {
      img {
        margin-right: 20px;
        width: clamp(2.2em, 3.8vw, 4em);
        height: clamp(2.2em, 3.8vw, 4em);
      }
    }
  }
`

export const NewsWrapper = styled.div`
  position: relative;
  max-width: 100dvw;
  width: 100%;

  .pagination {
    position: absolute;
    right: -130px;
    width: 210px;
    top: 30%;
    padding-left: 20px;
    transform: rotate(90deg);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      cursor: pointer;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      color: #000;
      margin: 0;
      list-style: none;
      padding: 5px 10px;

      li {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .active {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: RGB(48 49 52);
          cursor: pointer;
        }

        .static {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #790030;
        }
      }
    }
  }

  @media (max-width: 500px) {
    max-height: 368px;

    .pagination {
      right: 20%;
      width: 210px;
      top: 285px;
      height: 50px;
      padding-left: 0;
      transform: none;

      svg {
        height: 30px;
        width: 30px;
      }
    }
  }
`

export const NewsBg = styled.div`
  width: 100%;
  height: 280px;
  background-image: url(${(props) => props.bg});
  transition: all 0.2s ease;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 15px 15px 0 0;

  .newsText {
    padding: 10px 10px;
    align-items: center;
    display: grid;
    grid-template-columns: 25% 8% 42% 15%;
    gap: 0.5vw;
    width: 100%;
    height: auto;
    background: #fff;

    h1 {
      font-size: 28px;
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      margin: 0;
      line-height: 20px;
      font-weight: 600;

      span {
        font-size: 20px;
        font-weight: 400;
      }
    }

    svg {
      height: 25px;
      width: 25px;
    }

    h3 {
      color: rgba(82, 79, 79, 1);
      font-size: clamp(0.65em, 0.7em, 1.1vw);
      font-weight: 600;
      margin: 0px;
    }

    svg:nth-of-type(2) {
      height: 35px;
      width: 35px;
    }

    @media (max-width: 500px) {
      background-color: #790030;
      color: #fff;

      h3 {
        color: #fff;
      }
    }
  }
`

export const Offer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 40px 100px;
  justify-content: flex-end;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 500px) {
    width: auto;
  }
`

export const Img = styled.img`
  max-width: 90px;
  max-height: 90px;
  animation: ${bounce} 2s ease-in-out infinite;
`
