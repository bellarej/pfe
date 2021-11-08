import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CRow } from '@coreui/react';
import AddArticle from './AddNEwArticle';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { gteListArticle, deleteArticle } from 'src/providers/actions/article.actions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ArticleList = (props) => {
       const { gteListArticle, articlesStore, deleteArticle } = props;
       const [ArticleList, SetArticles] = useState([]);
       useEffect(() => {
              gteListArticle();
       }, []);
       useEffect(() => {
              articlesStore?.articlesList && SetArticles(articlesStore?.articlesList);
       }, [articlesStore]);
       return (
              <div className="article-page flex" style={{ paddingLeft: '100px' }}>
                     <CRow>
                            <AddArticle />
                     </CRow>
                     <CRow>
                            {ArticleList.length === 0 ? (
                                   <h1>there is not articles yet </h1>
                            ) : (
                                   <div className="article-list">
                                          {ArticleList.map((item, index) => (
                                                 <Card sx={{ maxWidth: 345 }}>
                                                        <CardHeader
                                                               avatar={
                                                                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                             {item.articleName[0]}
                                                                      </Avatar>
                                                               }
                                                               action={
                                                                      <div className="flex-center">
                                                                             <AddArticle edit={true} article={item} />
                                                                             <IconButton
                                                                                    onClick={(e) => deleteArticle(item.id)}
                                                                                    aria-label="settings"
                                                                             >
                                                                                    <DeleteForeverIcon />
                                                                             </IconButton>
                                                                      </div>
                                                               }
                                                               title={item.articleName}
                                                               subheader={item.category + ' - ' + item.price + ' TND'}
                                                        />

                                                        <CardMedia
                                                               component="img"
                                                               height="194"
                                                               image={'http://localhost:5200' + item.image}
                                                               alt="Paella dish"
                                                        />
                                                        <CardContent>
                                                               <Typography variant="body2" color="text.secondary">
                                                                      <div className="article_des">{item.description}</div>
                                                               </Typography>
                                                        </CardContent>
                                                 </Card>
                                          ))}
                                   </div>
                            )}
                     </CRow>
              </div>
       );
};

ArticleList.propTypes = {
       gteListArticle: PropTypes.func.isRequired,
       deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ articlesStore: state.articles });

const mapDispatchToProps = { gteListArticle, deleteArticle };

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
