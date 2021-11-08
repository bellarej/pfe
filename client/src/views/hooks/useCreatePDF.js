import html2canvas from 'html2canvas';
import { CButton } from '@coreui/react';
import { jsPDF } from 'jspdf';
import { CardMedia } from '@mui/material';
export default () => {
       const printDocument = (name) => {
              const input = document.getElementById('divToPrint');
              html2canvas(input).then((canvas) => {
                     const imgData = canvas.toDataURL('image/png');
                     const pdf = new jsPDF();
                     pdf.addImage(imgData, 'JPEG', 0, 0);
                     pdf.save(name + '.pdf');
              });
       };
       return {
              DownLoadPDFView: (data) => {
                     return (
                            <div style={{ alignItems: 'center' }}>
                                   <div>
                                          <div style={{ padding: '10px' }} id="divToPrint" className="mt4">
                                                 <h2 style={{ margin: '25px 0 ', color: 'green' }}>{data['Task name']} details :</h2>
                                                 {Object.keys(data).map((item) => {
                                                        return (
                                                               <>
                                                                      {!['id', 'action', 'articles', 'Article name', 'Assigned to'].includes(
                                                                             item,
                                                                      ) && (
                                                                             <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                                                                                    <h4>{item}</h4> :{' '}
                                                                                    <span style={{ marginLeft: 'auto' }}>{data[item]}</span>{' '}
                                                                             </div>
                                                                      )}
                                                               </>
                                                        );
                                                 })}
                                                 <h2 style={{ margin: '25px 0 ', color: 'green' }}>Articles details :</h2>
                                                 <div className="articles-list">
                                                        {data?.['Article name'].length > 0 &&
                                                               data?.['Article name'].map((art) => (
                                                                      <div>
                                                                             <h4>{art.articleName}</h4>
                                                                             <div>
                                                                                    <img width="100%" src={'http://localhost:5200' + art.image} />
                                                                             </div>
                                                                      </div>
                                                               ))}
                                                 </div>
                                          </div>
                                          <div className="mb5" style={{ display: 'grid', margin: '50px 0 30px 0 ', paddingBottom: '20px' }}>
                                                 <CButton color="success" onClick={(e) => printDocument(data?.['Task name'] || 'test')}>
                                                        Print
                                                 </CButton>
                                          </div>
                                   </div>
                            </div>
                     );
              },
       };
};
