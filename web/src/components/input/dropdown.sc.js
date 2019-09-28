import {
  styled
} from 'common'

export const Dropdown_ = styled.div`
  .aoyue-select {
    overflow: hidden;
    /* display: block; */
    /* margin: auto; */
    /* margin-top: 80px; */
    width: 350px;
    height: 100%;
    border-bottom: 0px;
    border-radius: 3px;
    /* font-size: 12px; */
    /* box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5); */
    /* color: #777; */
    z-index: 5;

  }
  .aoyue-select .dropdown-title {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 1em 0.5em;
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  .aoyue-select label.option {
    display: block;
    overflow: hidden;
    z-index: 2;
    width: 100%;
    /*  transition: all 1s ease-out;*/
  }

  .aoyue-select label.option span.dropdown-title {
    position: relative;
    z-index: 2;
    /*transition: background .3s ease-out;*/
  }

  .aoyue-select label.option span.dropdown-title:hover {
    color: #000;
    font-weight: bold;
    background: rgba(255, 255, 255, 1.0);
    box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  }

  .aoyue-select>a {
    text-decoration: none;
    color: #777 !important;
  }

  .aoyue-select>a:hover {
    text-decoration: none
  }
`