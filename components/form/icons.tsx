import React from "react";

export const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g fill="none">
        <path d="M20.94,12.312c0-.713-.063-1.413-.188-2.1H12v3.988h5.025c-.225.988-.863,2.088-2.038,2.838l3.15,2.438C19.95,17.437,20.94,15.062,20.94,12.312z" fill="#4285F4"></path>
        <path d="M12,21c2.6,0,4.787-.862,6.375-2.325l-3.15-2.437c-.862.588-1.975.925-3.225.925c-2.463,0-4.55-1.662-5.3-3.887H3.45v2.513C5.038,18.887,8.25,21,12,21z" fill="#34A853"></path>
        <path d="M6.7,13.212c-.175-.525-.275-1.075-.275-1.65s.1-1.125.275-1.65V7.488H3.45C2.862,8.662,2.5,9.987,2.5,11.562s.362,2.9.95,4.075L6.7,13.212z" fill="#FBBC05"></path>
        <path d="M12,6.237c1.413,0,2.688.487,3.688,1.438l2.8-2.8C16.787,3.35,14.6,2.5,12,2.5C8.25,2.5,5.037,4.613,3.45,7.488L6.7,9.925C7.45,7.7,9.537,6.237,12,6.237z" fill="#EA4335"></path>
    </g>
  </svg>
);

export const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.5 12.5C16.5 10.5 18 9.5 20 9.5C20 8.5 19.5 7 18.5 6C17.5 5 16 4.5 15 4.5C13 4.5 11.5 6 10.5 6C9.5 6 8 5 6.5 5C4.5 5 2.5 6.5 2.5 9C2.5 12.5 5.5 16 7.5 18C8.5 19 9.5 20 11 20C12.5 20 13 19 15 19C16.5 19 17.5 20 18.5 20C20.5 20 21.5 18 21.5 16C21.5 13.5 19 13 16.5 12.5ZM14.5 4.5C15.5 3.5 16 2 15 1C14.5 1.5 13.5 2 13 2.5C12.5 3 12 4 12.5 4.5C13 5 13.5 5.5 14.5 4.5Z" />
  </svg>
);

export const MessageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
  </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
