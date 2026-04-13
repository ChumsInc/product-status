import styled from "@emotion/styled";

const SortableItemListContainer = styled.div`
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    width: 100%;

    .table {
        white-space: nowrap;
        //height: 70vh;
        thead tr {
            th, td {
                background-color: var(--bs-table-bg) !important;
                border-bottom-width: 1px;
                border-color: var(--bs-border-color);
                box-shadow: var(--bs-box-shadow);
            }
        }
        tbody {
            td {
                //height: calc(var(--bs-body-line-height) * 1.2);
            }

            td.text-date {
                color: #198844;
            }

            td.text-decimal {
                color: #F96A38;
            }
        }
    } 
`;


export default SortableItemListContainer;
