<template>
    <div class="conf">
        <div class="conf-content">
            <div>
                <p>Apakah anda yakin ingin menghapus post ini?</p>
            </div>
            <div>
                <p class="title">"{{ postTitle }}"</p>
            </div>
            <div class="btn-cont">
                <button @click="deletePost" class="btn-opt delete">Ya, Saya yakin</button>
                <button @click="cancle" class="btn-opt cancle">Tidak</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'cancle',
        'deletePost',
        'postTitle'
    ],
}
</script>

<style lang="scss">
.conf {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    max-width: 80vw;
    height: max-content;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    .conf-content {
        padding: 0.6rem 1rem;
        >div {
            margin: 1rem 0;
            font-weight: 700;
        }
        .title {
            width: 100%;
        }
        .btn-cont {
            display: flex;
            .btn-opt {
                padding: 0.5rem 1rem;
                font-family: inherit;
                margin-right: 1rem;
                border-radius: 5px;
                border: none;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
                &:active {
                    opacity: 0;
                }
            }
            .btn-opt.delete {
                color: #fd0000;
                border: 2px solid #fd0000;
                background-color: transparent;
            }
            .btn-opt.cancle {
                background-color: #3dd8ff;
            }
        }
    }
}
</style>