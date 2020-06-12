import React from 'react'
export default function Footer(props)
{
    return( 
        <div className="text-center">
            Baseball Predictor  &copy; {new Date().getFullYear()}
        </div>

    );
}