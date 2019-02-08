import styled from 'styled-components';

import AsyncSelect from 'react-select/lib/Async'

export const BoatyardSelect = styled(AsyncSelect)`
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.3px;
  .css-2o5izw {
    min-height: 30px;
    height: 30px;
    border-radius: 6px;
    border: 1px solid #dfdfdf !important;
    box-shadow: none;
  }
  .css-vj8t7z {
    min-height: 30px;
    border-radius: 6px;
    border: 1px solid #dfdfdf;
    color: #000000;
    &:hover {
      border: 1px solid #dfdfdf;
      .css-1hwfws3 {
        .css-xp4uvy {
          color: #000000;
        }
      }
    }
    .css-1hwfws3 {
      .css-xp4uvy {
        color: #000000;
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