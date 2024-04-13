import React from 'react'
import { useGlobalState } from '../context/GlobalState';


export const Loader = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container">
      <div className="skeleton-content">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
};

export const Loader2 = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container-profile">
      <div className="skeleton-content-profile">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line-profile border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line-profile border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
};

export const Loader3 = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container-profile">
      <div className="skeleton-content-profile">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line-profile border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
};

export const AvatarLoader = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container1">
      <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-avatar1 border border-gray-300 rounded-full shadow-md"></div>
    </div>
  )
};

export const LineLoader = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container1">
      <div className="skeleton-content1">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line1 border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line2 border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line3 border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line4 border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
};

export const SmallSingleLineLoader = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container1">
      <div className="skeleton-content1">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line4 border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
}

export const DualLineLoader = () => {
  const [isDarkMode] = useGlobalState('isDarkMode');
  return (
    <div className="skeleton-container1">
      <div className="skeleton-content1">
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line5 border border-gray-300 rounded-md shadow-md"></div>
        <div style={{backgroundColor: `${isDarkMode ? '#333333' : '#ccc'}`}} className="skeleton-line1 border border-gray-300 rounded-md shadow-md"></div>
      </div>
    </div>
  )
}