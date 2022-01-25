<template>
    <div class="lds-center">
        <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<style>
.lds-center {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    background-color: rgb(29, 29, 29, 0.05);
    border-radius: 10px;
    transform: translate(-50%, -50%);
    z-index: 10000;
}
.lds-facebook {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
}
.lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background-color: #4CF4FF ;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
}
@keyframes lds-facebook {
    0% {
        top: 8px;
        height: 64px;
    }
    50%, 100% {
        top: 24px;
        height: 32px;
    }
}
    
</style>