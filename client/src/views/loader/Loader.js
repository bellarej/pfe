import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { css } from '@emotion/react';

export default function Loader() {
       return (
              <div className="loader-container">
                     <SyncLoader
                            color={'blue'}
                            loading={true}
                            css={css`
                                   display: block;
                                   margin: 0 auto;
                                   border-color: red;
                            `}
                            size={20}
                     />
              </div>
       );
}
