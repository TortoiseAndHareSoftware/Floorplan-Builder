import React from 'react';
import './App.css';

// class WarehouseSectionEditor extends React.Component {
//   constructor(props) {
//     super(props);

//   }


//   render() {
//     return (
//       <span></span>
//     );
//   }
// }


class WarehouseSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
      name: props.name,
      width: props.width,
      height: props.height,
      xOffset: props.xOffset,
      yOffset: props.yOffset,
      LastCheckedDateTime: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      SectionBGColor: "red"
    };

    this.renderSectionEditor = this.renderSectionEditor.bind(this);
  }

  renderSectionEditor() {
    this.setState({ LastCheckedDateTime: new Date().toDateString() + " " +  new Date().toLocaleTimeString() });
    if(this.state.SectionBGColor == "red")
    {
      this.setState({ SectionBGColor: "green" });
    }
    else  
    {
      this.setState({ SectionBGColor: "red" });
    }

  }


  render() {
    return (
      <div className="warehouse-section d-flex align-items-center" style={{
        "width": this.state.width + "%",
        "height": this.state.height + "%",
        marginLeft: this.state.xOffset + "%",
        marginTop: this.state.yOffset + "%",
        position: "absolute",
        top: 0,
        justifyContent: "center",
        padding: 5,
        backgroundColor: this.state.SectionBGColor
      }} onClick={this.renderSectionEditor}>
        <div className="d-flex flex-column" style={{backgroundColor: "white"}}>
          <p>{this.state.name}</p>
          <p>{this.state.LastCheckedDateTime}</p>
        </div>
      </div>
    );
  }
}

class FloorCanvas extends React.Component {

  renderSections(myComponents) {
    return myComponents.map((Component, index) => {
      return <WarehouseSection key={index} width={Component.width} height={Component.height} xOffset={Component.xOffset} yOffset={Component.yOffset} name={Component.name} />
    });
  }


  render() {
    const dimensions = window.innerWidth - 25;
    return (

      <div style={{
        width: dimensions,
        maxWidth: dimensions,
        height: dimensions,
        maxHeight: dimensions,
        margin: 5
      }}>
        <div id="canvas" className="bg-light" style={{
          width: "100%",
          height: "100%",
          position: "relative"
        }}>
          {this.renderSections(this.props.sections)}
        </div>
      </div>
    );
  }
}

class FloorCanvasEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionName: "Section #",
      sectionWidth: 0,
      sectionHeight: 0,
      sectionXOffset: 0,
      sectionYOffset: 0,
      totalWidth: 0,
      totalHeight: 0,
      sections: []
    };

    this.setSectionName = this.setSectionName.bind(this);
    this.setSectionWidth = this.setSectionWidth.bind(this);
    this.setSectionHeight = this.setSectionHeight.bind(this);
    this.setSectionXOffset = this.setSectionXOffset.bind(this);
    this.setSectionYOffset = this.setSectionYOffset.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);

  }

  setSectionName(e) {
    this.setState({ sectionName: e.target.value });
  }
  setSectionWidth(e) {
    this.setState({ sectionWidth: parseFloat(e.target.value) });
  }
  setSectionHeight(e) {
    this.setState({ sectionHeight: parseFloat(e.target.value) });
  }
  setSectionXOffset(e) {
    this.setState({ sectionXOffset: parseFloat(e.target.value) });
  }
  setSectionYOffset(e) {
    this.setState({ sectionYOffset: parseFloat(e.target.value) });
  }

  isTooWide(arr) {
    let widthArray = [];
    arr.forEach(element => {
      widthArray.push(element.width);
      widthArray.push(element.xOffset);
    });

    widthArray.push(this.state.sectionWidth);
    widthArray.push(this.state.sectionXOffset);


    let sum = 0.00;

    widthArray.forEach(element => {

      sum = sum + element
    });

    if (parseFloat(sum) >= 100.00) {
      return true;
    }
    else {
      return false;
    }
  }

  isTooHigh(arr) {
    let heightArray = [];
    arr.forEach(element => {
      heightArray.push(element.height);
      heightArray.push(element.yOffset);
    });

    heightArray.push(this.state.sectionHeight);
    heightArray.push(this.state.sectionYOffset);

    let sum = 0.00;

    heightArray.forEach(element => {

      sum = sum + element
    });

    if (sum >= 100) {
      return true;
    }
    else {
      return false;
    }
  }

  handleSubmitClick(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.isTooWide(this.state.sections) || this.isTooHigh(this.state.sections)) {
      alert("You've added a section that exceeds the dimensions of the canvas, please reduce your section dimensions or create a new canvas");
      return;
    }

    this.setState({
      sections: this.state.sections.concat([{
        name: this.state.sectionName,
        width: this.state.sectionWidth,
        height: this.state.sectionHeight,
        xOffset: this.state.sectionXOffset,
        yOffset: this.state.sectionYOffset
      }])
    });

    this.setState({
      sectionName: "",
      sectionWidth: 0,
      sectionHeight: 0,
      sectionXOffset: 0,
      sectionYOffset: 0
    });


  }

  handleClearClick(e) {
    e.preventDefault();
    this.setState({
      sectionName: "Section #",
      sectionWidth: 0,
      sectionHeight: 0,
      sectionXOffset: 0,
      sectionYOffset: 0,
      sections: []
    });
  }


  render() {
    return (
      <div>
        <form>


          <div className="form-group row">
            <label className="col-form-label col-md-3 col-xl-2">Section Width</label>
            <div className="col-md-3">
              <input className="form-control" type="number" min="0" value={this.state.sectionWidth} onChange={this.setSectionWidth} />
            </div>
            <label className="col-form-label col-md-3 col-xl-2">Section X Offset</label>
            <div className="col-md-3">
              <input className="form-control" type="number" min="0" value={this.state.sectionXOffset} onChange={this.setSectionXOffset} />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-3 col-xl-2">Section Height</label>
            <div className="col-md-3">
              <input className="form-control" type="number" min="0" value={this.state.sectionHeight} onChange={this.setSectionHeight} />
            </div>
            <label className="col-form-label col-md-3 col-xl-2">Section Y Offset</label>
            <div className="col-md-3">
              <input className="form-control" type="number" min="0" value={this.state.sectionYOffset} onChange={this.setSectionYOffset} />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-3 col-xl-2">Section Name</label>
            <div className="col-md-3">
              <input className="form-control" type="text" value={this.state.sectionName} onChange={this.setSectionName} />
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary mr-2" onClick={this.handleSubmitClick} type="submit">Add Section</button>
              <button className="btn btn-default" onClick={this.handleClearClick} type="submit">Clear Canvas</button>
            </div>
          </div>



        </form>
        <FloorCanvas sections={this.state.sections} />
      </div>
    );
  }

}





export default FloorCanvasEditor;
