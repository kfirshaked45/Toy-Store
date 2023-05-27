import { loadToys, removeToy, saveToy } from '../store/toy.action.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DashBoardPage() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  //   console.log(toys, 'Dashboard');
  //   useEffect(() => {
  //     loadToys();
  //   }, []);
  return <div>PAGE</div>;
}
