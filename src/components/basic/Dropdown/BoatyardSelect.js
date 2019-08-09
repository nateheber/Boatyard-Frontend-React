import styled from 'styled-components';

import AsyncSelect from 'react-select/lib/Async';

export const BoatyardSelect = styled(AsyncSelect)`
  font-size: 13px;
  font-weight: 400;
  letter-spacing: normal;
  .css-bl6clz {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 14px;
    color: #555;
  }
  .css-2o5izw,
  .css-vj8t7z {
    min-height: 30px;
    border-radius: 6px;
    border: 1px solid #dfdfdf !important;
    box-shadow: none;
    color: #555;
    &:hover {
      border: 1px solid #dfdfdf;
      .css-1hwfws3 {
        .css-xp4uvy {
          color: #555;
        }
      }
    }
    .css-1hwfws3 {
      div {
        color: #555;
        font-family: 'Source Sans Pro', sans-serif !important;
      }
    }
  }
  .css-1wy0on6 {
    .css-1uq0kb5 {
      padding: 4px 5px;
    }
    .css-d8oujb {
      display: none;
    }
    .css-1ep9fjw {
      display: none;
    }
  }
`;