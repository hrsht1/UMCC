import React, { useState, useEffect } from "react";
import "./CategoryTags.css";

//TODO make clicking these filters toggle which Events are shown on Calendar
export default function CategoryTags(props) {
  const { onChange } = props;
  const [selectedTags, setSelectedTags] = useState([]);

  const onTagChange = (e) => {
    const tagId = e.target.getAttribute("id");
    console.log("e.target.checked", e.target.checked, tagId);
    if (!e.target.checked) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags]);

  return (
    <div className="category">
      <h2 className="h3 center">Event Category Filters</h2>
      <table onChange={onTagChange}>
        <tbody>
          <tr>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Sport.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Sport" />
                <span>Sport</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Social&SupportGroups.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="SocialAndSupportGroups" />
                <span>Social and Support Groups</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Art.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Art" />
                <span>Art</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/YoungFamilies.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="YoungFamilies" />
                <span>Young Families</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Information.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Information" />
                <span>Imformation</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Seniors.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Seniors" />
                <span>Seniors</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Events.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Events" />
                <span>Events</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Youth.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label htmlFor="sport">
                <input type="checkbox" id="Youth" />
                <span>Youth</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/BushfireRecovery.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="BushfireRecovery" />
                <span>Bushfire Recovery</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/AllAges.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="AllAges" />
                <span>All Ages</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Entertainment.jpg").default}
                alt=""
              />
            </td>
            <td className="category-item-text">
              <label>
                <input type="checkbox" id="Entertainment" />
                <span>Entertainment</span>
              </label>
            </td>
            <td>
              <img
                className="category-item-img"
                src={require("../../images/Education&Training.jpg").default}
                alt=""
              />
            </td>
            <td>
              <label>
                <input type="checkbox" id="EducationAndTraining" />
                <span>Education and Training</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
